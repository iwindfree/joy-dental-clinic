import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch, urlFor } from "@/sanity/client";
import { postsByCategoryQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "임플란트 - 연세조이치과",
  description:
    "덴티움 임플란트와 MYPLANT 3D 맞춤 보철로 자연치아 같은 결과를 만듭니다. 연세조이치과의 임플란트 진료 안내와 칼럼을 확인하세요.",
};

function getCategoryGradient(category: string) {
  if (category === "ortho") return "linear-gradient(135deg, #FCE7F3, #FBCFE8)";
  if (category === "implant") return "linear-gradient(135deg, #DBEAFE, #BFDBFE)";
  return "linear-gradient(135deg, #D1FAE5, #A7F3D0)";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ImplantPage() {
  const posts = await safeFetch<any[]>(postsByCategoryQuery, {
    category: "implant",
  });

  return (
    <div className="specialty-page">
      {/* Hero / Intro */}
      <section className="specialty-hero implant-hero">
        <div className="specialty-hero-bg" style={{ backgroundImage: "url(/images/implant-hero.jpg)" }} />
        <div className="specialty-hero-overlay" />
        <div className="container">
          <span className="specialty-badge">Implant</span>
          <h1>임플란트</h1>
          <p>
            덴티움 임플란트와 MYPLANT 3D 맞춤 보철로
            <br />
            자연치아 같은 결과를 만듭니다.
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
                  <circle cx="12" cy="12" r="8" />
                  <line x1="18" y1="18" x2="25" y2="25" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <h3>정밀 진단</h3>
              <p>CT 촬영과 디지털 분석을 통해 환자 맞춤형 임플란트 계획을 수립합니다.</p>
            </div>
            <div className="specialty-intro-card">
              <span className="specialty-intro-icon">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 3h8l2 7c0 4-2.5 7-6 7s-6-3-6-7l2-7z" />
                  <path d="M12 17v6c0 1 .5 2 2 2s2-1 2-2v-6" />
                  <path d="M9 9l3 3 6-6" />
                </svg>
              </span>
              <h3>검증된 임플란트</h3>
              <p>덴티움 등 검증된 임플란트 시스템으로 안전하고 오래가는 결과를 제공합니다.</p>
            </div>
            <div className="specialty-intro-card">
              <span className="specialty-intro-icon">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20L8 4h4l4 16" />
                  <path d="M16 20l4-16h4l4 16" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                  <line x1="4" y1="20" x2="28" y2="20" />
                </svg>
              </span>
              <h3>맞춤 보철</h3>
              <p>MYPLANT 3D 기술로 환자 구강에 최적화된 보철을 제작합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {(posts ?? []).length > 0 && (
        <section className="section specialty-posts">
          <div className="container">
            <h2 className="section-title">임플란트 칼럼</h2>
            <p className="section-subtitle">
              임플란트에 관한 전문의 칼럼과 치료 사례
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
                          🦷
                        </div>
                      )}
                    </div>
                    <div className="blog-body">
                      <span className={`blog-tag ${post.category}`}>
                        임플란트
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
