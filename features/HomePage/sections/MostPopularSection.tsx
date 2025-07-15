import React, { useRef } from 'react';
import { TitleCard } from '@/components/TitleCard';
import { Typography } from '@/components/Typography';
import { Container } from '@/components/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const popularTitles = [
	{ id: '3', title: 'Space Odyssey', category: 'Sci-Fi', rating: 4.8 },
	{ id: '1', title: 'The Great Adventure', category: 'Fantasy', rating: 4.5 },
	{ id: '5', title: 'Thriller Night', category: 'Thriller', rating: 4.6 },
	{ id: '2', title: 'Mystery Manor', category: 'Mystery', rating: 4.2 },
	{ id: '6', title: 'Comedy Central', category: 'Comedy', rating: 4.3 },
	{ id: '8', title: 'Lost in Time', category: 'Sci-Fi', rating: 4.7 },
];

const MostPopularSection = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<section className="mb-12">
			<Container>
				<div className="flex items-center justify-between mb-4">
					<Typography variant="h2" weight="bold">
						Most Popular
					</Typography>
					<div className="flex gap-2">
						<button
							ref={prevRef}
							className="px-2 py-1 bg-zinc-800 rounded-full"
							aria-label="Previous"
						>
							&#8592;
						</button>
						<button
							ref={nextRef}
							className="px-2 py-1 bg-zinc-800 rounded-full"
							aria-label="Next"
						>
							&#8594;
						</button>
					</div>
				</div>
				<Swiper
					modules={[Navigation]}
					navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
					slidesPerView={4}
					spaceBetween={24}
					onInit={(swiper) => {
						// @ts-ignore
						swiper.params.navigation.prevEl = prevRef.current;
						// @ts-ignore
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
						swiper.navigation.update();
					}}
				>
					{popularTitles.map((title) => (
						<SwiperSlide key={title.id}>
							<TitleCard
								title={title.title}
								category={title.category}
								rating={title.rating}
								href={`/titles/${title.id}`}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</Container>
		</section>
	);
};

export { MostPopularSection };
