import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import auth from "../config/auth";


const prisma = new PrismaClient();

export class UserController {
	public static async Signup(request: Request, response: Response) {
		try {
			const { firstName, lastName, imageSrc, gender, email, birthDate, phone, password } = request.body;
			const { hash, salt } = auth.generatePassword(password);

			// Cria o carrinho vazio
			const cart = await prisma.cart.create({
				data: {}
			});

			// Cria a wishlist vazia
			const wishlist = await prisma.wishlist.create({
				data: {}
			});

			const createInput: Prisma.UserCreateInput = {
				firstName: firstName,
				lastName: lastName,
				email: email,
                birthDate: birthDate,
                phone: phone,
				imageSrc: imageSrc,
				gender: gender,
				cart: {
 					 connect: { id: cart.id } 
				},
				wishlist:{
					connect: {id: wishlist.id}
				},
				hash: hash,
				salt: salt
			};

			const createdUser = await prisma.user.create({
				data: createInput,
			});

			if(!createdUser){
				return response.status(404).json();
			}

			response.status(201).json(createdUser);
			
		} catch (error: any) {
			response.status(500).json({ message: error.message });
		}
	}

	static async login(request: Request, response: Response) {


        try {
            
            const {email, password} = request.body;
    
            const user = await prisma.user.findUnique({
                where:{email: email}
            });

            if(!user)
                return response.status(400).json({message:"usuario não existente"})

            const {hash, salt} = user

            if(!auth.checkPassword(password, hash, salt)){
                return response.status(400).json({message:"Senha incorreta"})
            }

        } catch (error) {
            return response.status(500).json()

        }
        
        
    }
}