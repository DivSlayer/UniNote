
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'demo-key' });

export const generateNoteSummary = async (noteTitle: string, noteDescription: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "سرویس هوش مصنوعی در حال حاضر در دسترس نیست (کلید API یافت نشد). این یک خلاصه ساختگی است برای نمایش قابلیت.";
  }

  try {
    const prompt = `
      به عنوان یک دستیار آموزشی فارسی زبان، لطفا یک خلاصه کوتاه و مفید (حداکثر ۱۰۰ کلمه) برای جزوه‌ای با عنوان "${noteTitle}" و توضیحات "${noteDescription}" بنویس. 
      هدف تشویق دانشجویان به مطالعه این جزوه است.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "خطا در تولید خلاصه.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "متاسفانه در حال حاضر امکان ارتباط با هوش مصنوعی وجود ندارد.";
  }
};

export const generateSampleQuestions = async (noteTitle: string): Promise<string[]> => {
    if (!process.env.API_KEY) {
        return [
            "سوال نمونه ۱: تعریف اصلی موضوع چیست؟",
            "سوال نمونه ۲: کاربردهای این مبحث کدامند؟",
            "سوال نمونه ۳: این مفهوم در چه سالی مطرح شد؟"
        ];
    }
    
    try {
        const prompt = `
          برای درس "${noteTitle}"، لطفا ۳ سوال چهارگزینه‌ای یا تشریحی کوتاه طرح کن که دانشجویان بتوانند دانش خود را بسنجند.
          خروجی باید فقط متن سوالات باشد که با خط تیره جدا شده‌اند.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        const text = response.text || "";
        return text.split('\n').filter(line => line.trim().length > 0);

    } catch (error) {
        console.error("Gemini Quiz Error", error);
        return ["خطا در تولید سوالات."];
    }
}

export const generateVideoSummary = async (courseTitle: string, topic: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return `در این جلسه از درس "${courseTitle}"، مباحث کلیدی مربوط به "${topic}" توسط استاد ارائه شد. سرفصل‌های بررسی شده شامل تعاریف پایه، بررسی نمونه‌های عملی و پاسخ به سوالات دانشجویان بود. (این یک نسخه نمایشی است - کلید API یافت نشد)`;
  }

  try {
    const prompt = `
      به عنوان یک دستیار هوشمند دانشگاهی، یک خلاصه ساختاریافته و کوتاه برای ویدیوی ضبط شده کلاس درس زیر بنویس:
      درس: ${courseTitle}
      موضوع جلسه: ${topic}
      
      خلاصه باید شامل ۳ الی ۴ نکته کلیدی احتمالی باشد که در این جلسه تدریس شده است. لحن باید رسمی و آموزشی باشد.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "خلاصه‌ای برای این ویدیو در دسترس نیست.";
  } catch (error) {
    console.error("Gemini Video Summary Error:", error);
    return "خطا در برقراری ارتباط با هوش مصنوعی برای تولید خلاصه ویدیو.";
  }
};
