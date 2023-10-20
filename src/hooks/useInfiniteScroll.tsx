import { useEffect } from 'react';

function useInfiniteScroll(callback: () => void) {
	useEffect(() => {
		function handleScroll() {
			if (
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight
			) {
				callback();
			}
		}

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [callback]);
}

export default useInfiniteScroll;
