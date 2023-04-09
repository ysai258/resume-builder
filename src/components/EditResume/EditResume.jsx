import React from 'react';
import { connect } from 'react-redux';
import ResumeForm from '../ResumeForm/ResumeForm';

const EditResume = ({ resume }) => {
  return (
      <ResumeForm initialValues={resume}  />
  );
};

const mapStateToProps = (state) => ({
  resume: state.resume.editingResume
});



export default connect(mapStateToProps, {})(EditResume);
