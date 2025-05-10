// File: src/app/layout.js
import '@/styles/global.css';
import StarField from '@/components/StarField';

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