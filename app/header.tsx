import { NextIntlClientProvider } from "next-intl";
import { getCategories } from "@/lib/cms";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { HeaderClient } from "@/components/layout/header";

export async function Header() {
    const categories = await getCategories();
    const locale = await getLocale();
    const t = await getTranslations("Layout");

    const translations = {
        subscribe: t("subscribe"),
        login: t("login"),
    };

    return (
        <NextIntlClientProvider locale={locale}>
            <HeaderClient categories={categories} translations={translations} />
        </NextIntlClientProvider>
    );
}