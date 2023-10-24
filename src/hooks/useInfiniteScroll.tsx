import { useEffect } from 'react';

function useInfiniteScroll(fetchData: () => void) {
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight
			) {
				fetchData();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [fetchData]);
}

export default useInfiniteScroll;
