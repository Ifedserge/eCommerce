import { github, rsSchoolLogo } from '../../../services/utilities/SVGs';
import { createBlock, createImg, createLink } from '../../../services/utilities/tags';
import { BlockType } from '../../types/enums';

export class AboutUs {
  static render(): HTMLElement {
    const wrapper = createBlock(BlockType.div, ['about-us']);

    const sergeAboutSection = this.createAboutSection(
      'Sergey Fedorov',
      ['Team Lead', 'Frontend Developer'],
      'My name is Fedorov Sergey, I am 30 years old. I live in Minsk. Still in love with frontend, especially after RS School.  Ready for interesting tasks and challenging work. In this project I have implemented the registration page, product page, as well as the shopping cart.',
      `https://github.com/Ifedserge`,
      '../../../../assets/serge.jpg'
    );
    const kirillAboutSection = this.createAboutSection(
      'Kirill Kostin',
      ['Frontend Developer'],
      'My name is Kostin Kirill. I am 32 and I live in St.Petersburg and work as a design engineer.I have been studying frontend for several years, and no events can break my desire to become a frontend developer💪. On the project I implemented routing, homepage and catalogue page, was responsible for filling products and setting up webpack. ',
      `https://github.com/konmedoed`,
      '../../../../assets/kirill.jpg'
    );
    const viacheslavAboutSection = this.createAboutSection(
      'Viacheslav Nevzorov',
      ['Frontend Developer'],
      'My name is Nevzorov Vyacheslav, I am 20 years old. I live in Gomel, I study at Francisk Skorina Gomel State University. I dont like Frontend, I have never loved it, and I dont aspire to become one, I was brought here by circumstances. I am more empathetic to backend development, so I am actively learning the .NET platform. In this project I was responsible for kanban board, about me page, login page, commerce tools sdk setup and about us page.',
      `https://github.com/siviavio4ka`,
      '../../../../assets/viacheslav.jpg'
    );

    const rsSchool = createLink(['rs-school-link'], 'https://rs.school/', 'RS School');
    rsSchool.innerHTML = rsSchoolLogo;

    wrapper.append(sergeAboutSection, kirillAboutSection, viacheslavAboutSection, rsSchool);
    return wrapper;
  }

  private static createAboutSection(
    fullName: string,
    roles: string[],
    bio: string,
    githubLink: string,
    imgSrc: string
  ): HTMLElement {
    const aboutSection = createBlock(BlockType.div, ['about-section']);

    const shortInfoContainer = createBlock(BlockType.div, ['short-info']);

    const fullNameContainer = createBlock(BlockType.div, ['short-item']);

    const fullNameTitle = createBlock(BlockType.div, ['text', 'text_bold']);
    fullNameTitle.textContent = 'Full Name:';

    const fullNameText = createBlock(BlockType.div, ['text']);
    fullNameText.textContent = fullName;

    shortInfoContainer.appendChild(fullNameContainer).append(fullNameTitle, fullNameText);

    const rolesContainer = createBlock(BlockType.div, ['short-item']);

    const rolesTitle = createBlock(BlockType.div, ['text', 'text_bold']);
    rolesTitle.textContent = 'Roles:';

    const rolesText = createBlock(BlockType.div, ['text']);
    rolesText.textContent = roles.join(', ');

    shortInfoContainer.appendChild(rolesContainer).append(rolesTitle, rolesText);

    const githubContainer = createBlock(BlockType.div, ['short-item']);

    const githubTitle = createBlock(BlockType.div, ['text', 'text_bold']);
    githubTitle.textContent = 'Github:';

    const githubLogo = createLink(['github-logo', 'text'], githubLink, 'Github');
    githubLogo.innerHTML = github;

    shortInfoContainer.appendChild(githubContainer).append(githubTitle, githubLogo);

    const bioContainer = createBlock(BlockType.div, ['short-item']);

    const bioTitle = createBlock(BlockType.div, ['text', 'text_bold']);
    bioTitle.textContent = 'Bio:';

    const bioText = createBlock(BlockType.div, ['text']);
    bioText.textContent = bio;

    bioContainer.append(bioTitle, bioText);

    const infoContainer = createBlock(BlockType.div, ['info']);

    infoContainer.append(shortInfoContainer, bioContainer);

    const imgContainer = createBlock(BlockType.div, ['about-img']);

    const img = createImg(['about-img'], imgSrc, fullName);

    imgContainer.appendChild(img);

    aboutSection.append(infoContainer, imgContainer);

    return aboutSection;
  }
}
