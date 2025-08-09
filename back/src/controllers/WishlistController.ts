import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class WishlistController {
  

  // Criar Wishlist do usuário
  public static async createWishlist(req: Request, res: Response) {
    try {
      const { user_id } = req.body;

      // Verificar se o usuário já tem uma wishlist
      const existingWishlist = await prisma.wishlist.findUnique({
        where: { user_id: parseInt(user_id) }
      });

      if (existingWishlist) {
        return res.status(400).json({ error: 'Usuário já possui uma wishlist' });
      }

      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: parseInt(user_id) }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const wishlist = await prisma.wishlist.create({
        data: {
          user_id: parseInt(user_id)
        },
        include: {
          user: true,
          items: {
            include: {
              product: true
            }
          }
        }
      });

      res.status(201).json(wishlist);
    } catch (error) {
      console.error('Erro ao criar wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar wishlist de um usuário
  public static async getWishlistByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      // Buscar wishlist do usuário
      const wishlist = await prisma.wishlist.findUnique({
        where: { user_id: parseInt(user_id) },
        include: {
          user: true,
          items: {
            include: {
              product: true
            }
          }
        }
      });

      // Verificar se a wishlist existe
      if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist não encontrada' });
      }

      res.json(wishlist);
    } catch (error) {
      console.error('Erro ao buscar wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Adicionar item à wishlist
  public static async addItemToWishlist(req: Request, res: Response) {
    try {
      const { user_id, product_id } = req.body;

      // Verificar se a wishlist existe
      const wishlist = await prisma.wishlist.findUnique({
        where: { wishlist_id: parseInt(user_id) }
      });

      if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist não encontrada' });
      }

      // Verificar se o produto existe
      const product = await prisma.product.findUnique({
        where: { id: parseInt(product_id) }
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Verificar se o item já existe na wishlist
      const existingItem = await prisma.wishlist_item.findUnique({
        where: {
          wishlist_id_product_id: {
            wishlist_id: parseInt(user_id),
            product_id: parseInt(product_id)
          }
        }
      });

      // Verificar se o item já existe na wishlist
      if (existingItem) {
        return res.status(400).json({ error: 'Produto já está na wishlist' });
      }

      // Adicionar item à wishlist
      const wishlistItem = await prisma.wishlist_item.create({
        data: {
          wishlist_id: parseInt(user_id),
          product_id: parseInt(product_id)
        },
        include: {
          product: true,
          wishlist: {
            include: {
              user: true
            }
          }
        }
      });

      res.status(201).json(wishlistItem);
    } catch (error) {
      console.error('Erro ao adicionar item à wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Remover item da wishlist
  public static async removeItemFromWishlist(req: Request, res: Response) {
    try {
      const { user_id, product_id } = req.params;

      // Remover item da wishlist
      const deletedItem = await prisma.wishlist_item.delete({
        where: {
          wishlist_id_product_id: {
            wishlist_id: parseInt(user_id),
            product_id: parseInt(product_id)
          }
        },
        include: {
          product: true
        }
      });

      res.json({ message: 'Item removido da wishlist com sucesso', deletedItem });
    } catch (error) {
      console.error('Erro ao remover item da wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Listar todos os itens de uma wishlist
  public static async getWishlistItems(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      // Buscar itens da wishlist
      const items = await prisma.wishlist_item.findMany({
        where: { wishlist_id: parseInt(user_id) },
        include: {
          product: true
        }
      });

      res.json(items);
    } catch (error) {
      console.error('Erro ao buscar itens da wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Deletar wishlist completa
  public static async deleteWishlist(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      // Primeiro deletar todos os itens da wishlist
      await prisma.wishlist_item.deleteMany({
        where: { wishlist_id: parseInt(user_id) }
      });

      // Depois deletar a wishlist
      await prisma.wishlist.delete({
        where: { wishlist_id: parseInt(user_id) }
      });

      res.json({ message: 'Wishlist deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Verificar se um produto está na wishlist
  public static async checkProductInWishlist(req: Request, res: Response) {
    try {
      const { user_id, product_id } = req.params;

      // Verificar se o item existe na wishlist
      const item = await prisma.wishlist_item.findUnique({
        where: {
          wishlist_id_product_id: {
            wishlist_id: parseInt(user_id),
            product_id: parseInt(product_id)
          }
        }
      });

      res.json({ 
        isInWishlist: !!item,
        item: item || null
      });
    } catch (error) {
      console.error('Erro ao verificar produto na wishlist:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default WishlistController;
