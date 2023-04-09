import "./ResumeList.css";

import { connect } from "react-redux";
import { editResume } from "../../actions/resumeAction";
import { useHistory } from "react-router-dom";

const ResumeList = ({ resumesData, editResume }) => {
  const history = useHistory();
  const handleEdit = (resume) => {
    editResume(resume);
    history.push("editResume");
  };

  return (
    <div className="resume-list">
      {resumesData.length == 0 ? (
        <div>No Resumes</div>
      ) : (
        resumesData.map((resume) => (
          <div className="resume" key={resume.name}>
            <div className="contact">
              <div>
                <h2>{resume.name}</h2>
                <h4>Education</h4>
                <ul className="education">
                  {resume.education.map((edu) => (
                    <li key={edu.id}>
                      {edu.degree} in {edu.institute} ({edu.year})
                    </li>
                  ))}
                </ul>
                <h4>Experience</h4>
                <ul className="experience">
                  {resume.experience.map((exp) => (
                    <li key={exp.id}>
                      {exp.designation} at {exp.company} ({exp.year})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="info">
                <p>{resume.address}</p>
                <p>{resume.phone}</p>
                <p>{resume.email}</p>
              </div>
            </div>
            {resume.skills && (
              <div>
                <h4>Skills</h4>
                <ul className="skills">
                  {resume.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(resume)}
            >
              edit
            </button>
          </div>
        ))
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  resumesData: state.resume.resumesData,
});

export default connect(mapStateToProps, { editResume })(ResumeList);
