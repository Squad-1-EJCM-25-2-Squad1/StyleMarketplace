import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando script de seed...');

  console.log('Limpando dados antigos...');
  await prisma.wishlist_item.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  console.log('Dados antigos limpos com sucesso.');

  console.log('Criando usuários...');
  const user1 = await prisma.user.create({
    data: {
      // name: 'Alice',
      // email: 'alice@example.com'
    },
  });
  const user2 = await prisma.user.create({
    data: {
      // name: 'Bob',
      // email: 'bob@example.com'
    },
  });
  console.log(`Usuário 1 criado com ID: ${user1.id}`);
  console.log(`Usuário 2 criado com ID: ${user2.id}`);

  console.log('Criando produtos...');
  const productA = await prisma.product.create({
    data: {
      name: 'Camiseta Básica',
      description: 'Uma camiseta confortável para o dia a dia.',
      base_price: 29.99,
      is_active: true,
    },
  });
  const productB = await prisma.product.create({
    data: {
      name: 'Calça Jeans Premium',
      description: 'Jeans de alta qualidade e durabilidade.',
      base_price: 99.99,
      is_active: true,
    },
  });
  const productC = await prisma.product.create({
    data: {
      name: 'Tênis Esportivo',
      description: 'Ideal para corrida e caminhada.',
      base_price: 150.00,
      is_active: true,
    },
  });
  console.log(`Produto A criado com ID: ${productA.id}`);
  console.log(`Produto B criado com ID: ${productB.id}`);
  console.log(`Produto C criado com ID: ${productC.id}`);

  console.log(`Criando wishlist para o usuário ${user1.id}...`);
  const wishlist1 = await prisma.wishlist.create({
    data: {
      user_id: user1.id
    }
  });
  console.log(`Wishlist criada para user ${user1.id} com ID: ${wishlist1.wishlist_id}`);

  console.log(`Adicionando Produto A (${productA.id}) à wishlist ${wishlist1.wishlist_id}...`);
  await prisma.wishlist_item.create({
    data: {
      wishlist_id: wishlist1.wishlist_id,
      product_id: productA.id
    }
  });
  console.log(`Produto A adicionado à wishlist ${wishlist1.wishlist_id} com sucesso.`);

  console.log('Script de seed finalizado.');
}

main()
  .catch(e => {
    console.error('Erro durante a execução do seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });