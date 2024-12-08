import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const stok = await prisma.stok.findUnique({
      where: { id },
    });

    if (!stok) {
      return NextResponse.json({ message: "Stok not found" }, { status: 404 });
    }

    return NextResponse.json(stok); 
  } catch (error) {
    console.error("Error fetching stok:", error);
    return NextResponse.json(
      { message: "Failed to fetch stok data" },
      { status: 500 }
    );
  }
}

// UPDATE //
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const { nama, jumlah, harga } = body;


    const updatedStok = await prisma.stok.update({
      where: { id },
      data: { nama, jumlah, harga },
    });

    return NextResponse.json(updatedStok);
  } catch (error) {
    console.error("Error updating stok:", error);
    return NextResponse.json(
      { message: "Failed to update stok" },
      { status: 500 }
    );
  }
}
