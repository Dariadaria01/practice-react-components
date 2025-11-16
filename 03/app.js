import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
  state = {
    comments: [],
    newComment: '',
  };

  handleChange = (e) => {
    this.setState({ newComment: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { newComment, comments } = this.state;
    if (newComment.trim() === '') return;

    this.setState({
      comments: [...comments, newComment],
      newComment: '',
    });
  };

  render() {
    const { title, body } = this.props;
    const { comments, newComment } = this.state;
    return (
      <article>
        <h1>{title}</h1>
        <p>{body}</p>
        <section>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                <textarea
                  style={{ minWidth: '300px', minHeight: '120px' }}
                  name='content'
                  value={newComment}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <input type='submit' value='dodaj komentarz' />
            </div>
          </form>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </section>
      </article>
    );
  }
}

root.render(
  <Article
    title='Programowanie jest super!'
    body='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam...'
  />
);
