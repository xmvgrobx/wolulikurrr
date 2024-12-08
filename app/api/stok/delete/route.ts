import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { error: 'ID stok tidak ditemukan' },
        { status: 400 }
      );
    }

    const emp = await prisma.stok.findUnique({
      where: { id },
    });

    if (!emp) {
      return NextResponse.json(
        { error: 'Stok tidak ditemukan' },
        { status: 404 }
      );
    }


    await prisma.stok.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Stok berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting stok:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus stok' },
      { status: 500 }
    );
  }
}
