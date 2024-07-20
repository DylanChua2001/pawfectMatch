import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Flex, IconButton, Button, Spacer } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import PetCard from './petCard';
import PetProfile from './petProfile';
import { useRouter } from 'next/navigation';
import FilterMenu from './filter'; // Import the FilterMenu component
import '../pages/pets/petList.css'; // Import the CSS file

const PetList = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);
  const [scrollingEnabled, setScrollingEnabled] = useState(true); // State to manage scrolling
  const [page, setPage] = useState(1); // State for pagination
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const response = await fetch('https://pawfect-match-three.vercel.app/api/pets/getAllPets');
        const data = await response.json();
        setPetsData(data);
        setFilteredPets(data);
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };

    fetchPetsData();
  }, []);

  useEffect(() => {
    const savedFavoritePets = JSON.parse(localStorage.getItem('favoritePets')) || [];
    setFavoritePets(savedFavoritePets);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritePets', JSON.stringify(favoritePets));
  }, [favoritePets]);

  useEffect(() => {
    if (scrollingEnabled && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPage(prevPage => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [scrollingEnabled]);

  useEffect(() => {
    const fetchMorePets = async () => {
      try {
        const response = await fetch(`https://pawfect-match-three.vercel.app/api/pets/getPetsByPage?page=${page}`);
        const data = await response.json();
        setFilteredPets(prevPets => [...prevPets, ...data]);
      } catch (error) {
        console.error('Error fetching more pets:', error);
      }
    };

    if (page > 1) {
      fetchMorePets();
    }
  }, [page]);

  const handlePetCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleBackToList = () => {
    setSelectedPet(null);
  };

  const handleSearch = () => {
    setScrollingEnabled(false); // Disable scrolling when searching
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = petsData.filter(pet =>
      pet.pet_name.toLowerCase().includes(lowercasedFilter) ||
      (pet.pet_breed && pet.pet_breed.toLowerCase().includes(lowercasedFilter))
    );
    setFilteredPets(filteredData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilteredPets(petsData);
    setScrollingEnabled(true); // Re-enable scrolling when clear filter
  };

  const handleLikePet = (pet) => {
    if (!favoritePets.some(favPet => favPet.pet_id === pet.pet_id)) {
      setFavoritePets([...favoritePets, pet]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const navigateToFavorites = () => {
    router.push('/pages/favpets'); // Navigate to favorites page
  };

  const applyFilters = (petIDs) => {
    const filteredData = petsData.filter(pet => petIDs.includes(pet.pet_id));
    setFilteredPets(filteredData);
    setScrollingEnabled(false); // Disable scrolling when filters are applied
  };

  useEffect(() => {
    if (!searchTerm && filteredPets.length === petsData.length) {
      setScrollingEnabled(true); // Re-enable scrolling when no search term or filters are applied
    }
  }, [searchTerm, filteredPets, petsData]);
  
  useEffect(() => {
    const handleScroll = (event) => {
      if (containerRef.current) {
        // Apply horizontal scroll to the container
        containerRef.current.scrollLeft += event.deltaY;
        // Prevent the default scroll behavior for horizontal scrolling
        event.preventDefault();
      }
    };
  
    // Attach event listener to the window object
    window.addEventListener('wheel', handleScroll, { passive: false });
  
    return () => {
      // Clean up event listener
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <Box maxW="100vw" borderRadius="15px" backgroundColor="rgba(255, 255, 255, 0.7)" px="20px">
      {selectedPet ? (
        <Box pt="70px">
          <Button
            onClick={handleBackToList}
            mb={4}
            position="absolute"
            top="20px"
            right="25px"
          >
            Back to Pets
          </Button>
          <PetProfile pet={selectedPet} onLike={handleLikePet} />
        </Box>
      ) : (
        <>
          <Flex alignItems="center">
            <Input
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              maxW="300px"
            />
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              onClick={handleSearch}
              bg="rgba(253, 222, 176, 1)"
              ml={2}
            />
            {searchTerm && (
              <IconButton
                aria-label="Clear filter"
                icon={<CloseIcon />}
                onClick={handleClearFilter}
                bg="rgba(253, 222, 176, 1)"
                ml={2}
              />
            )}
            <FilterMenu applyFilters={applyFilters} />
            <Spacer />
            <Button
              onClick={navigateToFavorites}
              bg="rgba(253, 222, 176, 1)"
              fontSize={["0.70rem", "0.80rem", "0.95rem", "1rem"]}
            >
              Favorites
            </Button>
          </Flex>
          <Box
            paddingBottom= "10px"
            display="flex" 
            overflowX="auto"
            sx={{
              overflowX: 'hidden', // Hide horizontal scrollbar
              '&::-webkit-scrollbar': {
                display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
              'scrollbar-width': 'none',     // Hide scrollbar for Firefox
              'overflow-x': 'auto',  
            }}
            >
            <Box
              paddingBottom="10px"
              className={`infinite-scroll-content ${scrollingEnabled ? '' : 'no-scroll'}`}
              ref={containerRef}
            >
              {filteredPets.map((pet) => (
                <Box key={pet.pet_id} flex="0 0 auto" maxW="sm" p={2}>
                  <PetCard pet={pet} onClick={() => handlePetCardClick(pet)} />
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PetList;
