export type MovieId = string;
export type ReviewId = string;
export type CinemaId = string;
export type PosterUrl = string;

// export type Genre = 'fantasy' | 'horror' | 'comedy' | 'action';
export type Movie = {
    title: string;
    posterUrl: PosterUrl;
    releaseYear: number;
    description: string;
    genre: string;
    id: MovieId;
    rating: number;
    director: string;
    reviewIds: ReviewId[];
}

export type Cinema = {
    id: CinemaId;
    name: string;
    movieIds: MovieId[];
}

export type FilterType = 'title' | 'genre' | 'cinema';
export type Filter = {
    type: FilterType;
    value: string;
}


export type Review = {
    id: ReviewId;
    name: string;
    text: string;
    rating: number;
}