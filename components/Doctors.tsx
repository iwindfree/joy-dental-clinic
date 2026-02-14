import { urlFor } from "@/sanity/client";

interface Doctor {
  _id: string;
  name: string;
  title: string;
  tag: string;
  initial: string;
  image?: { asset: { _ref: string } };
  specialties: string[];
  order: number;
}

interface DoctorsProps {
  doctors: Doctor[];
}

export default function Doctors({ doctors }: DoctorsProps) {
  const tagLabel = (tag: string) => {
    if (tag === "implant") return "임플란트 전문";
    if (tag === "ortho") return "교정 전문";
    return "일반 진료";
  };

  return (
    <section className="section doctors-section" id="doctors">
      <div className="container">
        <span className="doctors-label fade-in">MEDICAL TEAM</span>
        <h2 className="doctors-heading fade-in">의료진 소개</h2>
        <p className="doctors-subheading fade-in">각 분야 전문의가 직접 상담하고, 책임지고 치료합니다</p>
        <div className="doctors-list">
          {doctors.map((doc, i) => (
            <div
              key={doc._id}
              className={`doctor-card-v2 ${i % 2 !== 0 ? "reverse" : ""} fade-in`}
            >
              <div className="doctor-photo-v2">
                {doc.image ? (
                  <img
                    src={urlFor(doc.image).width(800).height(960).url()}
                    alt={doc.name}
                  />
                ) : (
                  <div className="doctor-photo-v2-placeholder">
                    {doc.initial}
                  </div>
                )}
                <div className="doctor-photo-caption">
                  <span className="doctor-photo-caption-name">{doc.name}</span>
                  <span className="doctor-photo-caption-title">{doc.title}</span>
                </div>
              </div>
              <div className="doctor-detail-v2">
                <span className="doctor-specialty-label">{tagLabel(doc.tag)}</span>
                <h3 className="doctor-name-v2">{doc.name}</h3>
                <p className="doctor-title-v2">{doc.title}</p>
                <div className="doctor-credentials-divider"></div>
                <ul className="doctor-credentials-v2">
                  {doc.specialties.map((spec, j) => (
                    <li key={j}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
