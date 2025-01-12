import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TelegramStorage } from '@/lib/telegram-storage';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const technology = searchParams.get('technology');
  const featured = searchParams.get('featured') === 'true';

  try {
    const where = {
      ...(category && { category }),
      ...(technology && { technologies: { has: technology } }),
      ...(featured && { featured: true }),
    };

    const projects = await prisma.project.findMany({
      where,
      orderBy: { completionDate: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const storage = new TelegramStorage();
    const images = data.getAll('images') as File[];
    const imageUrls = await Promise.all(
      images.map(image => storage.uploadFile(image))
    );

    const projectData = {
      ...JSON.parse(data.get('projectData') as string),
      imageUrls,
    };

    const project = await prisma.project.create({
      data: projectData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 