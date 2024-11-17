import {SubtitleResponseDto} from "../subtitleDtos/subtitle.response.dto";

export class MovieManageDto {
  id!: string;
  name!: string;
  description!: string;
  thumbnail!: string;
  status!: number;
  quality!: number;
  averageStar!: number;
  movieUrl!: string;
  allowingAge!: number;
  releaseDate!: Date;
  duration!: number;
  totalViews!: number;
  country!: string | null;
  subtitles!: SubtitleResponseDto[];
}
