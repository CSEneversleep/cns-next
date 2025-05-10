// File: src/app/layout.js
import '@/styles/global.css';
import StarField from '@/components/StarField';

// Default metadata
export const metadata = {
  title: "Afterglow",
  description: "제 3회 SKYST CSE: Never Sleeps의 최종 결과물",
  openGraph: {
    title: "Afterglow",
    description: "제 3회 SKYST CSE: Never Sleeps의 최종 결과물",
    siteName: "Afterglow",
    type: "website",
  },
  icons: { icon: "/opengraph/favicon.png", },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <StarField />
      </body>
    </html>
  );
}