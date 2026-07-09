"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setCategories([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <section className="categories py-10 bg-white container">
            <div className="flex gap-3 py-5">
                <div className="w-1.5 h-8 bg-linear-to-t from-primary-900 via-primary-700 to-primary-400 rounded-sm"></div>
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl   md:text-3xl font-bold">Shop By <span className="text-primary-700">Category</span></h2>
                    <Link href='/categories' className="see-all flex text-sm md:text-base items-center gap-2 text-primary-700/80">
                        <span>View All Categories</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-10">
                {loading ? (
                    <p className="col-span-full text-center">Loading...</p>
                ) : Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category: any) => (
                        <Link key={category._id} href={`/shop?category=${category._id}`} className="cart shadow hover:shadow-lg py-4 px-5 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                            <Image className="size-18 rounded-full object-cover" width={80} height={80} src={category.image} alt={category.slug}/>
                            <p className="font-semibold mt-3">{category.name}</p>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center">No categories found.</p>
                )}
            </div>
        </section>
    );
}