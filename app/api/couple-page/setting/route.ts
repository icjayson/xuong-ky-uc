import { getUser } from "@/utils/middlewares";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    person1_name,
    person1_nickname,
    person1_dob,
    person1_zodiac,
    person1_description,
    avatar_1_url,
    person2_name,
    person2_nickname,
    person2_dob,
    person2_zodiac,
    person2_description,
    avatar_2_url,
    start_date_of_love,
    title,
    font,
    color_scheme,
    clock_type,
    is_sharing
  } = await req.json();

  const { data: existingPage } = await supabase
    .from("couple_pages")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (existingPage) {
    const updates: Record<string, any> = {};

    if (person1_name) {
      updates.person1_name = person1_name;
    }

    if (person1_nickname) {
      updates.person1_nickname = person1_nickname;
    }

    if (person1_dob) {
      updates.person1_dob = person1_dob;
    }

    if (person1_zodiac) {
      updates.person1_zodiac = person1_zodiac;
    }

    if (person1_description) {
      updates.person1_description = person1_description;
    }

    if (avatar_1_url) {
      updates.avatar_1_url = avatar_1_url;
    }

    if (person2_name) {
      updates.person2_name = person2_name;
    }

    if (person2_nickname) {
      updates.person2_nickname = person2_nickname;
    }

    if (person2_dob) {
      updates.person2_dob = person2_dob;
    }

    if (person2_zodiac) {
      updates.person2_zodiac = person2_zodiac;
    }

    if (person2_description) {
      updates.person2_description = person2_description;
    }

    if (avatar_2_url) {
      updates.avatar_2_url = avatar_2_url;
    }

    if (start_date_of_love) {
      updates.start_date_of_love = start_date_of_love;
    }

    if (title) {
      updates.title = title;
    }

    if (font) {
      updates.font = font;
    }

    if (color_scheme) {
      updates.color_scheme = color_scheme;
    }

    if (clock_type) {
      updates.clock_type = clock_type;
    }

    if (is_sharing !== undefined) {
      updates.is_sharing = is_sharing;
    }

    const { error } = await supabase
      .from("couple_pages")
      .update(updates)
      .eq("user_id", userId);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Cập nhật thành công" });
  }

  const { error } = await supabase.from("couple_pages").insert({
    user_id: userId,
    person1_name,
    person1_nickname,
    person1_dob,
    person1_zodiac,
    person1_description,
    avatar_1_url,
    person2_name,
    person2_nickname,
    person2_dob,
    person2_zodiac,
    person2_description,
    avatar_2_url,
    start_date_of_love,
    title,
    font,
    color_scheme,
    clock_type,
    is_sharing
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Cập nhật thành công" });
}

export async function GET() {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("couple_pages")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu" },
      { status: 500 }
    );
  }

  const formattedData = {
    ...data,
    color_scheme: JSON.parse(data.color_scheme),
    start_date_of_love: new Date(data.start_date_of_love).toLocaleDateString(),
    person1_dob: new Date(data.person1_dob).toLocaleDateString(),
    person2_dob: new Date(data.person2_dob).toLocaleDateString()
  };

  return NextResponse.json({ data: formattedData });
}

export async function PATCH(req: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { password, domain } = await req.json();

  const updates: any = {};

  if (domain?.trim()) {
    if (domain.includes("@")) {
      return NextResponse.json(
        { error: "Domain không được chứa ký tự @." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("domain", domain);
    updates.domain = domain;
  }

  if (password) {
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    updates.password_hash = hashedPassword;
  }

  const { error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId);

  if (error) {
    if (error?.message.includes("unique_domain")) {
      return NextResponse.json(
        { error: "Domain đã được sử dụng." },
        { status: 400 }
      );
    }

    console.error("Update error:", error.message);
    return NextResponse.json({ error: "Cập nhật thất bại" }, { status: 500 });
  }

  return NextResponse.json({ message: "Cập nhật thành công" });
}
