// src/app/show/slide/page.js
import SlideShow from './SlideShow';
import { getTotalImage } from '@/utils/getImage';


export default async function Page({ params}) {
    const { event } = await params;

    const rawPhotos = await getTotalImage(event);
    const photos = JSON.parse(JSON.stringify(rawPhotos));

    return (
      <main className="container">
        <SlideShow photos={photos} animate = {true} width = "1000px" height = "750px" arrowScale = {0.05} showArrows = {true}/>
      </main>
    );
}

