import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const pg = await prisma.pegawai.findUnique({
      where: { id },
    });

    if (!pg) {
      return NextResponse.json({ message: "Pegawai not found" }, { status: 404 });
    }

    return NextResponse.json(pg); 
  } catch (error) {
    console.error("Error fetching pegawai:", error);
    return NextResponse.json(
      { message: "Failed to fetch pegawai data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const { name, email, phone, shift, alamat, jenisKelamin } = body;

    // Update data karyawan
    const updatedPegawai = await prisma.pegawai.update({
      where: { id },
      data: { name, email, phone, shift, alamat, jenisKelamin },
    });

    return NextResponse.json(updatedPegawai); 
  } catch (error) {
    console.error("Error updating pegawai:", error);
    return NextResponse.json(
      { message: "Failed to update pegawai" },
      { status: 500 }
    );
  }
}
