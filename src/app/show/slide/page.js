// src/app/show/slide/page.js
import SlideShow from './SlideShow';
import { getTotalImage } from '@/utils/getImage';


export default async function Page() {
  const res = await getTotalImage('kms');
  console.log(res);

  const photos = res
  .sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <main className="container">
      <SlideShow photos={photos} animate = {true} width = "400px" height = "300px" arrowScale = {0.08} showArrows = {true}/>
    </main>
  );
}

