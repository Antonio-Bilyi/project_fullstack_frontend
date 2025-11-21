import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../../_utils/utils";

type Props = {
  params: Promise<{ storyId: string }>;
};


export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();

    const cookie_string = cookieStore.toString();
    const {storyId} = await params;

    const res = await api.delete('/users/removeStoryFromSave', {
      headers: {
        Cookie: cookie_string,
        'Content-Type': 'application/json',
      },
      data: { storyId }
    });
    
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      console.log('ERROR', error.response?.data);
      
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}