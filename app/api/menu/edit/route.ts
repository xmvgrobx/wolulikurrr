import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';
import { MenuSchema } from '@/lib/zod';

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    
    // Explicit type conversion and handling
    const id = formData.get('id')?.toString() ?? '';
    const name = formData.get('name')?.toString() ?? '';
    const price = parseFloat(formData.get('price')?.toString() ?? '0');
    const description = formData.get('description')?.toString() || undefined;
    const imageFile = formData.get('image') as File | null;

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

    // Find existing menu item to get current image
    const existingMenu = await prisma.menu.findUnique({
      where: { id }
    });

    if (!existingMenu) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    // Handle image upload if new image provided
    let fotoUrl = existingMenu.fotoUrl;
    if (imageFile && imageFile.size > 0) {
      // Delete existing image
      if (existingMenu.fotoUrl) {
        await del(existingMenu.fotoUrl);
      }

      // Upload new image
      const { url } = await put(imageFile.name, imageFile, {
        access: 'public',
        multipart: true,
      });
      fotoUrl = url;
    }

    // Update menu item
    const menu = await prisma.menu.update({
      where: { id },
      data: {
        name,
        price,
        fotoUrl,
        ...(description && { description }),
      },
    });

    return NextResponse.json(
      { message: 'Menu updated successfully', menu },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update menu', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}