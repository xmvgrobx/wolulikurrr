import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const menuItem = await prisma.menu.findUnique({
      where: { id }
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    await prisma.menu.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Menu item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete menu item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}