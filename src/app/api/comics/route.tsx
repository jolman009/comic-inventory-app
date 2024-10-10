import { NextResponse } from 'next/server';
import { Comic } from '../../../db';
import { fetchComicMetadata } from '../../../utils/comicVineApi';

export async function GET() {
  try {
    const comics = await Comic.findAll();
    return NextResponse.json(comics);
  } catch (error) {
    console.error('Error fetching comics:', error);
    return NextResponse.json({ error: 'Failed to fetch comics' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const comicMetadata = await fetchComicMetadata(body.title);
    const newComic = await Comic.create({ ...body, metadata: comicMetadata });
    return NextResponse.json(newComic, { status: 201 });
  } catch (error) {
    console.error('Error creating comic:', error);
    return NextResponse.json({ error: 'Failed to create comic' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateFields } = body;
    await Comic.update(updateFields, { where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error updating comic:', error);
    return NextResponse.json({ error: 'Failed to update comic' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await Comic.destroy({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting comic:', error);
    return NextResponse.json({ error: 'Failed to delete comic' }, { status: 500 });
  }
}