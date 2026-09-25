import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookiestore = await cookies();
    const token = cookiestore.get('github_access_token')?.value;
   if (!token) {
    return NextResponse.json(
      { error: "GitHub access token missing" },
      { status: 401 }
    );
  }

    const allrepos=[];
    let page=1;

    while(true){
        const res = await fetch(`https://api.github.com/user/repos?per_page=10&page=${page}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json'
            }
        });

        if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch repositories" },
        { status: res.status }
      );
    }

        const repos = await res.json();
        if (repos.length === 0) {
            break;
        }
        allrepos.push(...repos);
        page++;
    }

    return NextResponse.json(allrepos.map(r => ({ id: r.id, name: r.name, full_name: r.full_name, private: r.private, html_url: r.html_url, description: r.description, language: r.language, owner: r.owner.login })));
}
