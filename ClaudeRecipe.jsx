
import Markdown from 'react-markdown'
export default function ClaudeRecipe({recipe}) {
  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <Markdown>{recipe}</Markdown>
    </section>
  );
}
