
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/locales/client';

export default function HomePage() {
    const t = useI18n();
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center text-center">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                        {t('hero.title_1')}
                    </h1>
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                        {t('hero.title_2')}
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        {t('hero.description')}
                    </p>
                    <div className="space-x-4">
                        <Button onClick={() => router.push('/dashboard/marketplace')}>{t('hero.cta_explore')}</Button>
                        <Button variant="secondary" onClick={() => router.push('/login')}>{t('hero.cta_get_started')}</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
