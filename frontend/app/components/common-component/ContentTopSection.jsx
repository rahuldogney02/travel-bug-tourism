


    import React from "react";
    import cardData from "../../data/cardsection.json";

    /**
     * ContentTopSection
     * Props:
     * - slug: 'domestic' | 'international'
     *
     * Renders an h3 and paragraph pulled from app/data/cardsection.json.
     * This is a server component (reads local JSON) and uses Tailwind classes
     * so sizes match the rest of the app layout.
     */
    export default function ContentTopSection({ slug = "international" }) {
        const data = cardData?.[slug];

        if (!data) return null;

        return (
            <section className="py-4">
                <div className="container mx-auto px-4">
                    <div className="w-full">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-4 md:p-6">
        
                                <div className="text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                        {data.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }