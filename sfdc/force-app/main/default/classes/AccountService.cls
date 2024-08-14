public without sharing class AccountService {
    public AccountService() {

    }

    public static List<AccountWrapper> getAccounts(String recordType) {
        List<AccountWrapper> wpList = new List<AccountWrapper>();
        for (Account acc : [SELECT Id, Name, StartDate_d__c, EndDate_d__c, ID_t__c, Description FROM Account WHERE RecordType.DeveloperName = :recordType ORDER BY EndDate_d__c DESC]) {
            wpList.add(new AccountWrapper(acc));
        }
        return wpList;
    }

    public class AccountWrapper {
        public String name;
        public String start_date;
        public String end_date;
        public String addition_info;
        public String uuid;

        public AccountWrapper(Account a) {
            name = a.Name;
            addition_info = a.Description;
            start_date = a.StartDate_d__c == null ? '' : a.StartDate_d__c.format();
            end_date = a.EndDate_d__c == null ? '' : a.EndDate_d__c.format();
            uuid = a.ID_t__c;
        }
    }
}