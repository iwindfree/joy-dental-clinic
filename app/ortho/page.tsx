import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch, urlFor } from "@/sanity/client";
import { postsByCategoryQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "교정 - 연세조이치과",
  description:
    "투명교정, 데이몬교정, 자가결찰 브라켓 등 다양한 교정 방법을 제공합니다. 연세조이치과의 교정 진료 안내와 칼럼을 확인하세요.",
};

function getCategoryGradient(category: string) {
  if (category === "ortho") return "linear-gradient(135deg, #FCE7F3, #FBCFE8)";
  if (category === "implant") return "linear-gradient(135deg, #DBEAFE, #BFDBFE)";
  return "linear-gradient(135deg, #D1FAE5, #A7F3D0)";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function OrthoPage() {
  const posts = await safeFetch<any[]>(postsByCategoryQuery, {
    category: "ortho",
  });

  return (
    <div className="specialty-page">
      {/* Hero / Intro */}
      <section className="specialty-hero ortho-hero">
        <div className="specialty-hero-bg" style={{ backgroundImage: "url(/images/ortho-hero.jpg)" }} />
        <div className="specialty-hero-overlay" />
        <div className="container">
          <span className="specialty-badge">Orthodontics</span>
          <h1>치아교정</h1>
          <p>
            투명교정, 데이몬교정, 자가결찰 브라켓 등
            <br />
            다양한 교정 방법을 제공합니다.
          </p>
        </div>
      </section>

      {/* Intro Detail */}
      <section className="section specialty-intro">
        <div className="container">
          <div className="specialty-intro-grid">
            <div className="specialty-intro-card">
              <span className="specialty-intro-icon">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 14c0-5 3-10 8-10s8 5 8 10" />
                  <rect x="8" y="12" width="3" height="5" rx="1" />
                  <rect x="12.5" y="12" width="3" height="5" rx="1" />
                  <rect x="17" y="12" width="3" height="5" rx="1" />
                  <path d="M8 17c1 4 3 6 6 6s5-2 6-6" />
                </svg>
              </span>
              <h3>투명교정</h3>
              <p>눈에 띄지 않는 투명 장치로 일상생활에 불편 없이 교정할 수 있습니다.</p>
            </div>
            <div className="specialty-intro-card">
              <span className="specialty-intro-icon">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 20L10 8" />
                  <path d="M22 20L18 8" />
                  <path d="M10 8h8" />
                  <circle cx="14" cy="8" r="2" />
                  <path d="M8 14h12" />
                  <path d="M12 20l2-6 2 6" />
                </svg>
              </span>
              <h3>데이몬교정</h3>
              <p>자가결찰 시스템으로 통증은 줄이고 치료 기간은 단축합니다.</p>
            </div>
            <div className="specialty-intro-card">
              <span className="specialty-intro-icon">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="11" />
                  <circle cx="14" cy="14" r="7" />
                  <circle cx="14" cy="14" r="3" />
                  <line x1="14" y1="3" x2="14" y2="6" />
                  <line x1="14" y1="22" x2="14" y2="25" />
                  <line x1="3" y1="14" x2="6" y2="14" />
                  <line x1="22" y1="14" x2="25" y2="14" />
                </svg>
              </span>
              <h3>맞춤 치료 계획</h3>
              <p>디지털 분석을 통해 환자 개개인에 최적화된 교정 계획을 설계합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {(posts ?? []).length > 0 && (
        <section className="section specialty-posts">
          <div className="container">
            <h2 className="section-title">교정 칼럼</h2>
            <p className="section-subtitle">
              치아교정에 관한 전문의 칼럼과 치료 사례
            </p>
            <div className="blog-grid">
              {(posts ?? []).map((post) => {
                const thumbUrl = post.thumbnail
                  ? urlFor(post.thumbnail)
                      .width(400)
                      .height(240)
                      .fit("crop")
                      .url()
                  : null;

                return (
                  <Link
                    key={post._id}
                    href={`/columns/${post.slug.current}`}
                    className="blog-card"
                  >
                    <div className="blog-thumb">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={post.title}
                          className="blog-thumb-img"
                        />
                      ) : (
                        <div
                          className="blog-thumb-bg"
                          style={{
                            background: getCategoryGradient(post.category),
                          }}
                        >
                          😁
                        </div>
                      )}
                    </div>
                    <div className="blog-body">
                      <span className={`blog-tag ${post.category}`}>
                        교정
                      </span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt ? post.excerpt.slice(0, 80) : ""}</p>
                      <div className="blog-date">
                        {new Date(post.date)
                          .toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\. /g, ".")
                          .replace(/\.$/, "")}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
