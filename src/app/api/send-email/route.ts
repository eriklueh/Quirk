import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT ?? '587'),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_USER,
            subject: `Nuevo mensaje de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
    }
}