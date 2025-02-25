'use server'
import { FAQ } from "@/types/ui.type";
import { promises as fs } from "fs";
import path from "path";

export async function getFAQs(): Promise<FAQ[]> {
    try {
        const data = await fs.readFile(
            path.join(process.cwd(), "data/faq.json")
        );

        const faqList = JSON.parse(data.toString());
        return await faqList as FAQ[];
    } catch (error) {
        console.error("Error fetching the JSON data:", error);
        throw error;
    }
}