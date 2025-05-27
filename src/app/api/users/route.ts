import { NextResponse } from 'next/server';

const users = [
    {id: 1, name: 'UWASE UTUJE Sandrine', email: 'utujesandrine456@gmail.com'},
    {id: 2, name: 'IRUMVA BARAKA Samuel', email: 'barakasamuel@gmail.com'}
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const { name, email } = await request.json();

    if (!name || !email) {
        return NextResponse.json(
            { message: "Name and Email required" },
            { status: 400 }
        );
    }

    const existinguser = users.find(user => user.email === email);
    if(existinguser){
        return NextResponse.json(
            { message: "User already exists" }, 
            { status: 400 });
    }


    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    return NextResponse.json(newUser);
} 