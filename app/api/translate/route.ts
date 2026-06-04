import { NextResponse } from 'next/server';

const GOOGLE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';

const LANGUAGE_MAP: Record<string, string> = {
  jw: 'jv',
};

function normalizeTargetLanguage(target: string) {
  return LANGUAGE_MAP[target] || target;
}

async function translateSingleText(text: string, target: string): Promise<string> {
  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: target,
    dt: 't',
    q: text.substring(0, 500),
  });

  const response = await fetch(`${GOOGLE_TRANSLATE_URL}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Google Translate returned ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    return text;
  }

  const translated = data[0]
    .filter((segment: any) => Array.isArray(segment) && typeof segment[0] === 'string')
    .map((segment: any) => segment[0])
    .join('');

  return translated || text;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload.target !== 'string' || !Array.isArray(payload.texts)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const target = normalizeTargetLanguage(payload.target);
    const texts = (payload.texts as Array<unknown>).map((text) => String(text ?? ''));
    const results: string[] = [];
    const concurrency = 5;

    for (let index = 0; index < texts.length; index += concurrency) {
      const batch = texts.slice(index, index + concurrency);
      const translatedBatch = await Promise.all(
        batch.map(async (text: string) => {
          try {
            return await translateSingleText(text, target);
          } catch (error) {
            console.error('Google Translate fetch failed for text:', text, error);
            return text;
          }
        })
      );
      results.push(...translatedBatch);
    }

    return NextResponse.json({ translations: results });
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json({ error: 'Translation request failed' }, { status: 500 });
  }
}
