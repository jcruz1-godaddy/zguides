import React from 'react';
import PropTypes from 'prop-types';
import Pivots from '@ux/pivot';
import { BiSupport } from 'react-icons/bi';
import { FaBook } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

function Title({ title, external }) {
  return (
    <span className='h3'>
      <strong>{title}</strong>
      {external && (
        <span className='ml-2'>
          <FiExternalLink className='icon-light' size='24px' />
        </span>
      )}
    </span>
  );
}

Title.propTypes = { title: PropTypes.string, external: PropTypes.bool };

function SubTitle({ subTitle, code }) {
  return (
    <>
      {(code && (
        <code>{subTitle}</code>
      )) || <p>{subTitle}</p>}
    </>
  );
}

SubTitle.propTypes = { subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), code: PropTypes.bool };

const HomePivots = () => {
  const pivots = [
    {
      graphic: <FaBook color='#6accd3' />,
      onClick: () => window.open('https://github.com/gdcorp-appservices/spaq-docs/blob/main/README.md', '_blank'),
      title: <Title title='About SPAQ' external={ true } />,
      subtitle: <SubTitle subTitle='Learn everything about the SPAQ program and how you can onboard!' />
    },
    {
      graphic: <BiSupport color='#6accd3' />,
      onClick: () => window.open('https://godaddy.slack.com/archives/CAS4YDGGM/', '_blank'),
      title: <Title title='SPAQ support' external={ true } />,
      subtitle: <SubTitle subTitle='#spaq-onboarding' code={ true } />
    }
  ];

  return (
    <>
      <hr/>
      <Pivots grid={{ md: 6, xl: 6 }} pivotList={ pivots } />
    </>);
};

HomePivots.propTypes = {
  service: PropTypes.object,
  projectId: PropTypes.string
};

export default HomePivots;
