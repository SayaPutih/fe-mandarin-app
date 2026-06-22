"use client";

type Props = {
  hanzi?: string;
  pinyin?: string;
  meaning?: string[];
  hsk_level?: number | string;
  onContinue?: () => void;
};

export default function FlashCardWordPreview({
  hanzi,
  pinyin,
  meaning,
  hsk_level,
  onContinue,
}: Props) {
  const meanings = Array.isArray(meaning)
  ? meaning
  : [];

  return (
    <div className="flex flex-col items-center gap-8 py-8">

      <div className="text-center">
        <h1 className="text-8xl font-bold">
          {hanzi}
        </h1>

        <p className="text-2xl text-gray-500 mt-2">
          {pinyin}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          HSK {hsk_level}
        </p>
      </div>

      <div className="flex
                    flex-wrap
                    justify-center
                    gap-3
                    max-w-4xl"
                >
        {meanings?.map((item, index) => (
          <div
            key={index}
            className="
              bg-gray-300
              rounded-xl
              px-4 py-2
              text-center
            "
          >
            <p className="text-sm text-gray-800 font-bold">{item}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onContinue}
        className="
          bg-black
          text-white
          px-8 py-3
          rounded-xl
          font-semibold
        "
      >
        Continue
      </button>

    </div>
  );
}