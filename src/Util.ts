export default class Util{
    public static resolvePath(path: string, startDir?: string){
        const projectDir = startDir ?? process.cwd();
        if(path.startsWith('./')) path = path.slice(1);
        if(path.startsWith('../')) {
            const pathArr = path.split('/');
            pathArr.splice(0, 1);
            const dirArr = projectDir.split('/');
            dirArr.splice(dirArr.length-1, 1);
            return Util.resolvePath(pathArr.join('/'), dirArr.join('/'));
        }
        return projectDir+"/"+path;
    }
}