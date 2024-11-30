import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID pegawai tidak ditemukan' },
        { status: 400 }
      );
    }

    const emp = await prisma.pegawai.findUnique({
      where: { id },
    });

    if (!emp) {
      return NextResponse.json(
        { error: 'Pegawai tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.pegawai.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Pegawai berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting pegawai:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus pegawai' },
      { status: 500 }
    );
  }
}
