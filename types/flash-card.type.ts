export interface flashCardQuestions{
    questions : flashCard[]
}

export interface flashCard{
    id : string;
    hanzi : string;
    pinyin : string;
    meaning : string;
    options : string[];
    hsk_level : number;
}

export interface hanzi{
    hanzi : string;
    pinyin : string;
    meaning : string;
    hsk_level : number;
}