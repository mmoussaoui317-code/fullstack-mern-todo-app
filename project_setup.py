import os

def create_project_structure():
    folders=['backend', 'frontend', 'docs', 'scripts']

    for folder in folders:
        os.makedirs(folder, exist_ok=True)

        print(f'Created: {folder}')


with open('.gitignore', 'w') as f:
    f.write('node_modules/\n.env\n')

print('Project Structure created!')


if __name__=='__main__':
    create_project_structure()