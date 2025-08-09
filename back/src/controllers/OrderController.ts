import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class OrderController {

  // Criar um novo pedido
  public static async createOrder(req: Request, res: Response) {
    try {
      const { user_id, address, products } = req.body;

      // Validar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: parseInt(user_id) }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Calcular o custo total e validar produtos
      let totalCost = 0;
      for (const product of products) {
        const productData = await prisma.product.findUnique({
          where: { id: parseInt(product.product_id) }
        });
        
        if (!productData) {
          return res.status(404).json({ error: `Produto ${product.product_id} não encontrado` });
        }
        
        // Converter Decimal para Number para cálculos
        const basePrice = Number(productData.base_price);
        totalCost += basePrice * product.quantity;
      }

      // Criar o pedido
      const order = await prisma.order.create({
        data: {
          user_id: parseInt(user_id),
          address,
          total_cost: totalCost
        }
      });

      // Criar os produtos do pedido
      for (const product of products) {
        await prisma.orderProduct.create({
          data: {
            order_id: order.id,
            product_id: parseInt(product.product_id),
            quantity: parseInt(product.quantity),
            unit_price: Number(product.unit_price || 0)
          }
        });
      }

      // Buscar o pedido completo com relacionamentos
      const completeOrder = await prisma.order.findUnique({
        where: { id: order.id },
        include: {
          user: true,
          order_products: {
            include: {
              product: true
            }
          }
        }
      });

      res.status(201).json(completeOrder);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar pedidos por usuário
  public static async getOrdersByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const orders = await prisma.order.findMany({
        where: { user_id: parseInt(user_id) },
        include: {
          order_products: {
            include: {
              product: true
            }
          }
        },
        orderBy: { date_ordered: 'desc' }
      });

      res.json(orders);
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar pedido por ID
  public static async getOrderById(req: Request, res: Response) {
    try {
      const { order_id } = req.params;

      const order = await prisma.order.findUnique({
        where: { id: parseInt(order_id) },
        include: {
          user: true,
          order_products: {
            include: {
              product: true
            }
          }
        }
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json(order);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar status do pedido
  public static async updateOrderStatus(req: Request, res: Response) {
    try {
      const { order_id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
      }

      const order = await prisma.order.update({
        where: { id: parseInt(order_id) },
        data: { status },
        include: {
          order_products: {
            include: {
              product: true
            }
          }
        }
      });

      res.json(order);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Adicionar produto a um pedido existente
  public static async addProductToOrder(req: Request, res: Response) {
    try {
      const { order_id } = req.params;
      const { product_id, quantity, unit_price } = req.body;

      // Verificar se o pedido existe
      const order = await prisma.order.findUnique({
        where: { id: parseInt(order_id) }
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      // Verificar se o produto existe
      const product = await prisma.product.findUnique({
        where: { id: parseInt(product_id) }
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Adicionar produto ao pedido
      const orderProduct = await prisma.orderProduct.create({
        data: {
          order_id: parseInt(order_id),
          product_id: parseInt(product_id),
          quantity: parseInt(quantity),
          unit_price: Number(unit_price)
        },
        include: {
          product: true
        }
      });

      // Recalcular o custo total do pedido
      const allOrderProducts = await prisma.orderProduct.findMany({
        where: { order_id: parseInt(order_id) }
      });

      let newTotalCost = 0;
      for (const op of allOrderProducts) {
        newTotalCost += Number(op.unit_price) * op.quantity;
      }

      // Atualizar o custo total do pedido
      await prisma.order.update({
        where: { id: parseInt(order_id) },
        data: { total_cost: newTotalCost }
      });

      res.status(201).json(orderProduct);
    } catch (error) {
      console.error('Erro ao adicionar produto ao pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Remover produto de um pedido
  public static async removeProductFromOrder(req: Request, res: Response) {
    try {
      const { order_id, product_id } = req.params;

      // Verificar se o produto existe no pedido
      const orderProduct = await prisma.orderProduct.findUnique({
        where: {
          order_id_product_id: {
            order_id: parseInt(order_id),
            product_id: parseInt(product_id)
          }
        }
      });

      if (!orderProduct) {
        return res.status(404).json({ error: 'Produto não encontrado no pedido' });
      }

      // Remover o produto do pedido
      await prisma.orderProduct.delete({
        where: {
          order_id_product_id: {
            order_id: parseInt(order_id),
            product_id: parseInt(product_id)
          }
        }
      });

      // Recalcular o custo total do pedido
      const remainingOrderProducts = await prisma.orderProduct.findMany({
        where: { order_id: parseInt(order_id) }
      });

      let newTotalCost = 0;
      for (const op of remainingOrderProducts) {
        newTotalCost += Number(op.unit_price) * op.quantity;
      }

      // Atualizar o custo total do pedido
      await prisma.order.update({
        where: { id: parseInt(order_id) },
        data: { total_cost: newTotalCost }
      });

      res.json({ message: 'Produto removido do pedido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover produto do pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Listar todos os pedidos
  public static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: true,
          order_products: {
            include: {
              product: true
            }
          }
        },
        orderBy: { date_ordered: 'desc' }
      });

      res.json(orders);
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default OrderController;
