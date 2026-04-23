import { Mail, Phone, MapPin, Link2, Globe, FolderGit2, ExternalLink } from 'lucide-react';
import './ResumePreview.css';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
};

export default function ResumePreview({ data }) {
  const skillsList = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const hasContent = data.fullName || data.jobTitle || data.email;

  return (
    <div className="resume-preview" id="resume-preview">
      {!hasContent ? (
        <div className="preview-empty">
          <div className="preview-empty__icon">📄</div>
          <h2 className="preview-empty__title">Your Resume Preview</h2>
          <p className="preview-empty__text">Start filling in your details on the left to see your resume come to life here</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="resume-header">
            <div className="resume-header__top">
              {data.photo && (
                <img src={data.photo} alt={data.fullName} className="resume-photo" />
              )}
              <div className="resume-header__info">
                <h1 className="resume-name">{data.fullName || 'Your Name'}</h1>
                {data.jobTitle && <p className="resume-jobtitle">{data.jobTitle}</p>}
              </div>
            </div>
            <div className="resume-contact">
              {data.email && (
                <span className="resume-contact__item">
                  <Mail size={13} /> {data.email}
                </span>
              )}
              {data.phone && (
                <span className="resume-contact__item">
                  <Phone size={13} /> {data.phone}
                </span>
              )}
              {data.location && (
                <span className="resume-contact__item">
                  <MapPin size={13} /> {data.location}
                </span>
              )}
              {data.linkedin && (
                <span className="resume-contact__item">
                  <Link2 size={13} /> {data.linkedin}
                </span>
              )}
              {data.website && (
                <span className="resume-contact__item">
                  <Globe size={13} /> {data.website}
                </span>
              )}
            </div>
          </header>

          {/* Summary */}
          {data.summary && (
            <section className="resume-section">
              <h2 className="resume-section__title">Professional Summary</h2>
              <p className="resume-section__text">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.some(e => e.company || e.position) && (
            <section className="resume-section">
              <h2 className="resume-section__title">Work Experience</h2>
              {data.experience.map((exp, i) => (
                (exp.company || exp.position) && (
                  <div key={i} className="resume-entry">
                    <div className="resume-entry__top">
                      <div>
                        <h3 className="resume-entry__title">{exp.position}</h3>
                        <p className="resume-entry__subtitle">{exp.company}</p>
                      </div>
                      <span className="resume-entry__date">
                        {exp.startDate && `${formatDate(exp.startDate)} — ${formatDate(exp.endDate)}`}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="resume-entry__description">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </section>
          )}

          {/* Education */}
          {data.education.some(e => e.institution || e.degree) && (
            <section className="resume-section">
              <h2 className="resume-section__title">Education</h2>
              {data.education.map((edu, i) => (
                (edu.institution || edu.degree) && (
                  <div key={i} className="resume-entry">
                    <div className="resume-entry__top">
                      <div>
                        <h3 className="resume-entry__title">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                        <p className="resume-entry__subtitle">{edu.institution}</p>
                      </div>
                      <span className="resume-entry__date">
                        {edu.startDate && `${formatDate(edu.startDate)} — ${formatDate(edu.endDate)}`}
                      </span>
                    </div>
                  </div>
                )
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.some(p => p.name || p.description) && (
            <section className="resume-section">
              <h2 className="resume-section__title">Projects</h2>
              {data.projects.map((proj, i) => (
                (proj.name || proj.description) && (
                  <div key={i} className="resume-entry">
                    <div className="resume-entry__top">
                      <div>
                        <h3 className="resume-entry__title resume-project-name">
                          {proj.name}
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resume-project-link"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </h3>
                        {proj.techStack && (
                          <div className="resume-project-tech">
                            {proj.techStack.split(',').map((tech, j) => (
                              <span key={j} className="resume-project-tech-tag">{tech.trim()}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="resume-entry__description">{proj.description}</p>
                    )}
                  </div>
                )
              ))}
            </section>
          )}

          {/* Skills */}
          {skillsList.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">Skills</h2>
              <div className="resume-skills">
                {skillsList.map((skill, i) => (
                  <span key={i} className="resume-skill-tag">{skill}</span>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
