// app/show/slide/page.js

import SlideShow from './SlideShow';
import { getTotalImage } from '@/utils/getImage';

export default async function SlidePage({ params }) {
    const { event } = await params;
    const sliderawPhotos = await getTotalImage(event);
    const photos = JSON.parse(JSON.stringify(sliderawPhotos));

    return (
      <main className="container">
        <SlideShow photos={photos} animate = {true} width = "400px" height = "300px" arrowScale = {0.08} showArrows = {true}/>
      </main>
    );
}

