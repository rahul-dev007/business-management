#!/bin/bash

echo "📦 Installing ESLint, Prettier and related plugins..."

npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-next

echo "✅ Installation complete!"

echo "📝 Creating .eslintrc.json..."

cat > .eslintrc.json <<EOL
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "prettier"
  ],
  "plugins": ["react"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
EOL

echo "📝 Creating .prettierrc..."

cat > .prettierrc <<EOL
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "endOfLine": "auto"
}
EOL

echo "📝 Creating VS Code settings..."

mkdir -p .vscode

cat > .vscode/settings.json <<EOL
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
EOL

echo "🎉 All done! ESLint & Prettier are fully set up."
