---
layout: post
title : DATABASE NAMING CONVENTIONS
categories:
- 개발
comments: true
---



ABSTRACT

This document defines the naming rules of database objects.

CONVENTIONS

All Objects

1.    Do not use numbers, spaces, reserved keywords and special characters in the DB object name.

Databases

1.    For all parts of the database name use Pascal Case.

2.    Examples

§  Account, Statistics, Sale

Tables

1.    Table names should be plural.

2.    For table names with multiple words, only the last word should be plural.

3.    For all parts of the table name use Pascal Case.

4.    Avoid using abbreviations if possible. If abbreviation is needed, all the letters of it must be upper-case.

5.    Intersection table should be named by concatenating the names of the tables that have a one to many relationship with the intersection table. You can use “And” between table names.

6.    Examples

§  Accounts, AccountDetails, ServicesAndGoods

Columns

1.    If a column is the surrogate key, using IDENTITY keyword or integer data type, Follow this structure :

§  {Table Name (singular)}{SN}

2.    For all parts of the column name use Camel Case.

3.    Avoid using abbreviations if possible. If abbreviation is needed, all the letters of it must be upper-case.

4.    Foreign key columns should have the same name as they do in the parent table where the column is the primary key.

5.    There is one exception to this rule, which is when you have more than one foreign key column per table referencing the same primary key column in another table.

6.    The name of the column using “bit” data type must use “Flag” suffix.

7.    The name of the column using “datetime” or “smalldatetime” data type must use “Date” suffix.

8.    Examples

§  accountSN, completedFlag, modifiedDate, ARSCode

Indexes

1.    Follow this structure :

§  {IX}_{U/N}{C/N}_{Table Name}_{ColumnsIndexed}

§  Where “U/N” is for unique or non-unique and “C/N” is for clustered or non-clustered.

2.    Examples

§  IX_UN_Users_SSN, IX_NN_Subscriptions_serviceSN, IX_NC_Transfers_transferredDate

Constraints

1.    Follow this structure :

§  Primary Key

§  {PK}_{Table Name}

§  Foreign Key

§  {FK}_{Parent Table Name}_{Child Table Name}

§  If there are two or more foreign keys that refer the same primary key, follow this structure.

§  {FK}_{Parent Table Name}_{Child Table Name}_{Column Name of the Child Table}

§  Default

§  {DF}_{Table Name}_{Column Name}

§  Check

§  {CK}_{Table Name}_{Column Name}

§  Unique

§  Follow the naming rule of unique index.

Views

1.    View names should be plural.
For view names with multiple words, only the last word should be plural.

2.    For all parts of the table name use Pascal Case.

3.    Avoid using abbreviations if possible. If abbreviation is needed, all the letters of it must be upper-case.

4.    Prefix looks like this :

§  {V/VIX}_

§  Where “V” is for normal view and “VIX” is for indexed view.

5.    Examples

§  V_SaleSummries, VIX_TotalBoardCounts

Stored Procedures

1.    Use “P_” as a prefix.

2.    For all parts of the SP’s name, except prefix part, use Pascal Case.

3.    In case of simple CRUD operation

§  Create

§  P_Add{Entity Name}

§  Retrieve

§  P_{Get/GetList}{Entity Name}

§  Where “Get” is for getting single row using output parameters and “GetList” is for getting one or more row(s) using record-set.

§  Update

§  P_Mod{Entity Name}

§  Delete

§  P_Del{Entity Name}

4.    If the SP returns a scalar value or performs an operation like validation, processing a certain bussiness logic, use the verb and noun combination.

5.    Examples

§  P_AddAccount, P_GetListCustomer, P_ValidateCoupon, P_Refund

User-Defined Funtions

1.    Follow this prifix rule.

§  Scalar Function

§  “FN_”

§  Inline Table-Valued Function

§  “IF_”

§  Table Valued Function

§  “TF_”

§  For all parts of the UDF’s name, except prefix part, use Pascal Case.

2.    Examples

§  FN_IPv4ToInt, IF_Split

Triggers

1.    Use “TRG_” as a prifix.

2.    DML Trigger

1.   Follow this structure :

§  {TRG}_{Table Name}_{InsteadOf}{Ins/Upd/Del}

§  Where “InsteadOf” is only for instead of trigger and “Ins” is for insert trigger and “Upd” is for update trigger and “Del” is for delete trigger.

2.   Do not allow a trigger that handles more than one operation.

3.   Do not allow multiple triggers per operation per table.

4.   Examples

§  TRG_Movies_Upd, TRG_Customers_InsteadOfDel

3.    DDL Trigger (Database Scope)

1.   Follow this structure :

§  {DDL_TRG}_{Databae Name}

2.   Examples

§  DDL_TRG_AIDADB, DDL_TRG_NABUCCODB

Variables

1.    Use the Hungarian convention.

2.    Consis of two parts :

§  The prefix part, which describes the data type of the variable.

§  The base part, which describes the content of the variable.

The following table shows data type abbreviations that should be used as prefixes.


<table>
        <tbody>
            <tr>
                <td>
                    Data Type
                </td>
                <td>
                    Prefix
                </td>
                <td>
                    Example
                </td>
            </tr>
            <tr>
                <td>
                    char
                </td>
                <td>
                    chr
                </td>
                <td>
                    @chrSSN
                </td>
            </tr>
            <tr>
                <td>
                    varchar
                </td>
                <td>
                    vch
                </td>
                <td>
                    @vchTitle
                </td>
            </tr>
            <tr>
                <td>
                    nchar
                </td>
                <td>
                    nch
                </td>
                <td>
                    @nchName
                </td>
            </tr>
            <tr>
                <td>
                    nvarchar
                </td>
                <td>
                    nvc
                </td>
                <td>
                    @nvcSubject
                </td>
            </tr>
            <tr>
                <td>
                    datetime
                </td>
                <td>
                    dtm
                </td>
                <td>
                    @dtmIssuedDate
                </td>
            </tr>
            <tr>
                <td>
                    smalldatetime
                </td>
                <td>
                    sdt
                </td>
                <td>
                    @sdtStartDate
                </td>
            </tr>
            <tr>
                <td>
                    tinyint
                </td>
                <td>
                    iny
                </td>
                <td>
                    @inyBankCode
                </td>
            </tr>
            <tr>
                <td>
                    smallint
                </td>
                <td>
                    ins
                </td>
                <td>
                    @insArticleCount
                </td>
            </tr>
            <tr>
                <td>
                    int
                </td>
                <td>
                    int
                </td>
                <td>
                    @intCustomerSN
                </td>
            </tr>
            <tr>
                <td>
                    bigint
                </td>
                <td>
                    inb
                </td>
                <td>
                    @inbCyberCashAmount
                </td>
            </tr>
            <tr>
                <td>
                    numeric / decimal
                </td>
                <td>
                    dec
                </td>
                <td>
                    @decProfit
                </td>
            </tr>
            <tr>
                <td>
                    money
                </td>
                <td>
                    mny
                </td>
                <td>
                    @mnyRealCashAmount
                </td>
            </tr>
            <tr>
                <td>
                    binary
                </td>
                <td>
                    bin
                </td>
                <td>
                    @binPath
                </td>
            </tr>
            <tr>
                <td>
                    varbinary
                </td>
                <td>
                    vbi
                </td>
                <td>
                    @vbiPassword
                </td>
            </tr>
            <tr>
                <td>
                    bit
                </td>
                <td>
                    bit
                </td>
                <td>
                    @bitCompletedFlag
                </td>
            </tr>
            <tr>
                <td>
                    timestamp
                </td>
                <td>
                    tsp
                </td>
                <td>
                    @tspRowVersion
                </td>
            </tr>
            <tr>
                <td>
                    uniqueidentifier
                </td>
                <td>
                    guid
                </td>
                <td>
                    @guidSubscriptionKey
                </td>
            </tr>
            <tr>
                <td>
                    xml
                </td>
                <td>
                    xml
                </td>
                <td>
                    @xmlPart
                </td>
            </tr>
            <tr>
                <td>
                    table
                </td>
                <td>
                    tbl
                </td>
                <td>
                    @tblNumbers
                </td>
            </tr>
            <tr>
                <td>
                    sql-variant
                </td>
                <td>
                    var
                </td>
                <td>
                    @varDescription
                </td>
            </tr>
        </tbody>
    </table>
