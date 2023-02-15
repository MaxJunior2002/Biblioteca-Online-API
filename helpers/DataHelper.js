class DataHelper{

    static async geraData(){
        let data = await new Date();
        data = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;

        return data;
    }
}

export default DataHelper;