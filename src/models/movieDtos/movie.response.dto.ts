import {CountryDto} from "../countryDtos/country.dto";
import {SubtitleResponseDto} from "../subtitleDtos/subtitle.response.dto";
import {ParticipantDto} from "../participantDtos/participant.dto";
import {CommentDto} from "../commentDtos/comment.dto";
import {CategoryDto} from "../categoryDtos/category.dto";

export class MovieResponseDto {
  id!: string;
  name!: string;
  description!: string;
  thumbnail!: string;
  status!: number;
  quality!: number;
  average_Star!: number;
  movie_Url!: number;
  allowing_Age!: number;
  release_Date!: string;
  duration!: number;
  totalViews!: number;
  country: CountryDto = new CountryDto();
  categories: CategoryDto[] = [];
  subtitles: SubtitleResponseDto[] = [];
  comments: CommentDto[]  = [];
  participants: ParticipantDto[] = [];
}
