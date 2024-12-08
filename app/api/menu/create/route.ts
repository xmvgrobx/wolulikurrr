import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import { MenuSchema } from '@/lib/zod';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Explicit type conversion and handling
    const name = formData.get('name')?.toString() ?? '';
    const price = parseFloat(formData.get('price')?.toString() ?? '0');
    const description = formData.get('description')?.toString() || undefined;
    const imageFile = formData.get('image') as File;

    // Validate the data
    const validateFields = MenuSchema.safeParse({
      name,
      price,
      description,
    });

    if (!validateFields.success) {
      return NextResponse.json(
        { error: validateFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Upload image
    const { url } = await put(imageFile.name, imageFile, {
      access: 'public',
      multipart: true,
    });

    // Create menu with explicit type handling
    const menu = await prisma.menu.create({
      data: {
        name,
        price,
        fotoUrl: url,
        ...(description && { description }),
      },
    });

    return NextResponse.json(
      { message: 'Menu created successfully', menu },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create menu', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}